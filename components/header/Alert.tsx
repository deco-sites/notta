import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="carousel carousel-center w-screen bg-[#52534c] gap-6">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="md:text-xs md:h-[38px] text-[10px] text-secondary-content flex justify-center items-center w-screen h-[30px] font-normal font-[Helvetica]">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
