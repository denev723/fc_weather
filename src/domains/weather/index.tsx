import { WeatherAdapterInterface } from "@/api/weather/types";
import { mergeForecastWithShortTermForecast } from "@/domains/weather/utils";
import { FC } from "react";

interface Props {
  live: Awaited<ReturnType<WeatherAdapterInterface["live"]>>;
  today_temperature: Awaited<
    ReturnType<WeatherAdapterInterface["todayTemperature"]>
  >;
  merged_forecast: Awaited<
    ReturnType<typeof mergeForecastWithShortTermForecast>
  >;
}

const WeatherMain: FC<Props> = (props) => {
  const { live, today_temperature, merged_forecast } = props;
  console.log(live, today_temperature, merged_forecast);

  return (
    <main>
      <h1>Weather</h1>
    </main>
  );
};

export { WeatherMain };
