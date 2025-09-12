import { FC } from "react";
import Image from "next/image";
import styles from "./index.module.css";

interface Props {
  image_data_url: string | undefined;
}

const BackgroundImage: FC<Props> = (props) => {
  const { image_data_url } = props;

  if (!image_data_url) return null;

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={image_data_url}
        alt="배경이미지"
        fill={true}
        sizes="100vw"
      />
    </div>
  );
};

export { BackgroundImage };
