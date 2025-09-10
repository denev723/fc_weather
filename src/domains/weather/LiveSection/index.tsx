import { WeatherAdapterInterface } from "@/api/weather/types";
import { WindDirection } from "@/domains/weather/component/WindDirection";
import { getRainyType } from "@/domains/weather/utils";
import { FC } from "react";

interface Props {
  live: Awaited<ReturnType<WeatherAdapterInterface["live"]>>;
  today_temperature: Awaited<
    ReturnType<WeatherAdapterInterface["todayTemperature"]>
  >;
}

const LiveSection: FC<Props> = (props) => {
  const { live, today_temperature } = props;
  return (
    <section>
      <div>
        <div>
          {/* 현재 기온, 강수여부 */}
          <strong>{live.T1H?.obsrValue}℃</strong>
          <strong>{getRainyType(live.PTY?.obsrValue)}</strong>
        </div>
        <div>
          {/* 최저, 최고 기온 */}
          <dl>
            <dt>최저</dt>
            <dd>{today_temperature.min}℃</dd>
          </dl>
          <dl>
            <dt>최고</dt>
            <dd>{today_temperature.max}℃</dd>
          </dl>
          <span>(오전 6시, 오후 3시)</span>
        </div>
      </div>
      <div>
        {/* 강수량, 습도, 풍향, 풍속 */}
        <dl>
          <dt>강수량</dt>
          <dd>{live.RN1?.obsrValue}mm</dd>
        </dl>
        <dl>
          <dt>습도</dt>
          <dd>{live.REH?.obsrValue}%</dd>
        </dl>
        <dl>
          <dt>풍향</dt>
          <dd>
            <WindDirection direction={parseInt(live.VEC?.obsrValue ?? "0")} />
          </dd>
        </dl>
        <dl>
          <dt>풍속</dt>
          <dd>{live.WSD?.obsrValue}(m/s)</dd>
        </dl>
      </div>
    </section>
  );
};

export { LiveSection };
