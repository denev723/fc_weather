import { Weather, WeatherAdapter } from "@/api/weather";
import { WeatherMain } from "@/domains/weather";
import {
  getRainyType,
  mergeForecastWithShortTermForecast,
} from "@/domains/weather/utils";
import dayjs from "dayjs";
import { GetStaticProps } from "next";
import { ComponentProps, FC } from "react";
import { OpenAI } from "openai";

interface Props extends ComponentProps<typeof WeatherMain> {}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const weather_instance = new Weather(60, 126);
  const weather = new WeatherAdapter(weather_instance);

  const promise = [
    weather.live(),
    weather.todayTemperature(),
    weather.forecast(),
    weather.shortTermForecast(),
  ] as const;

  const [live, today_temperature, forecast, short_term_forecast] =
    await Promise.all(promise);

  const merged_forecast = mergeForecastWithShortTermForecast(
    forecast,
    short_term_forecast
  );

  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

  const temperature = live.T1H.obsrValue;
  const sky = getRainyType(live.PTY.obsrValue);
  const currentHour = dayjs().tz("Asia/Seoul").hour();

  const prompt = `
    Create a beautiful Korean landscape at ${currentHour}:00 showing ${temperature}°C weather with ${sky} conditions. The scene should capture the natural atmosphere and lighting that matches this specific time of day and weather in Korea, with realistic colors and mood that perfectly represents the current temperature and sky conditions.
  `;

  const images = await openai.images.generate({
    model: "dall-e-2",
    n: 1,
    size: "256x256",
    prompt,
    response_format: "b64_json",
  });

  const image_data_url = `data:image/jpeg;base64,${
    images.data?.at(0)?.b64_json
  }`;

  return {
    props: {
      live,
      today_temperature,
      merged_forecast,
      update_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      image_data_url,
    },
    revalidate: 60 * 60,
  };
};

const WeatherPage: FC<Props> = (props) => {
  return <WeatherMain {...props} />;
};

export default WeatherPage;
