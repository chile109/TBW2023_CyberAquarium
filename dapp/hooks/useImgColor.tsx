import { useState, useEffect } from "react";
import getColors from 'get-image-colors';

type colorRawType = {
  _rgb: [number, number, number, number],
}
const useImgColor = (imgUrl: string) => {
  const [color, setColor] = useState<Array<colorRawType>>([]);

  useEffect(() => {
    getColors(imgUrl)
      .then((colors) => {
        setColor(colors.map((clr) => ({ _rgb: clr._rgb._unclipped })))
        console.log(color)
      })
      .catch((err) => {
        // console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);
  return color;
};
export default useImgColor;