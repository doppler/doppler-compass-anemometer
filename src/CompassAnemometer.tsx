import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, getTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const CompassAnemometer: React.FC<Props> = ({
  options,
  data,
  width,
  height,
}) => {
  const theme = getTheme();
  const styles = getStyles(theme);

  const dir = data.series
    .map((series) => series.fields.find((field) => field.name === 'dir'))
    .map((field) => field?.values.get(field.values.length - 1))[0];

  const mps = data.series
    .map((series) => series.fields.find((field) => field.name === 'mps'))
    .map((field) => field?.values.get(field.values.length - 1))[1];

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
        <defs>
          <path
            id='hash'
            d='M 250 0 L 256 32 L 262 0 Z'
            className={styles.direction}
          />
        </defs>

        <path
          className={styles.directionIndicator}
          id='directionIndicator'
          d='M 258 32 L 260 256 L 314 314 L 256 480 L 197 314 L 252 256 L 254 32 Z'
          style={{ transform: `rotate(${dir}deg)` }}
        />

        <circle className={styles.face} id='face' cx='256' cy='256' r='240' />

        <circle
          className={styles.centerCircle}
          id='centerCircle'
          cx='256'
          cy='256'
          r='82.9'
        />

        <text className={styles.velocityText} id='velocityText' x='256' y='266'>
          {Math.round(mps * 2.237)}
        </text>
        <text className={styles.velocityLegend} x='256' y='325'>
          mph
        </text>

        <text x='243' y='30' className={cx(styles.direction, styles.text)}>
          N
        </text>
        <text x='483' y='269' className={cx(styles.direction, styles.text)}>
          E
        </text>
        <text x='243' y='509' className={cx(styles.direction, styles.text)}>
          S
        </text>
        <text x='4' y='269' className={cx(styles.direction, styles.text)}>
          W
        </text>

        <use href='#hash' transform='rotate(22.5, 256, 256)' />
        <use href='#hash' transform='rotate(45, 256, 256)' />
        <use href='#hash' transform='rotate(67.5, 256, 256)' />
        <use href='#hash' transform='rotate(112.5, 256, 256)' />
        <use href='#hash' transform='rotate(135, 256, 256)' />
        <use href='#hash' transform='rotate(157.5, 256, 256)' />
        <use href='#hash' transform='rotate(202.5, 256, 256)' />
        <use href='#hash' transform='rotate(225, 256, 256)' />
        <use href='#hash' transform='rotate(247.5, 256, 256)' />
        <use href='#hash' transform='rotate(292.5, 256, 256)' />
        <use href='#hash' transform='rotate(315, 256, 256)' />
        <use href='#hash' transform='rotate(337.5, 256, 256)' />
      </svg>

      <div className={styles.textBox}>
        <div>{dir}°</div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory((theme) => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    direction: css`
      fill: hsla(240, 100%, 90%, 0.5);
    `,
    directionIndicator: css`
      stroke: white;
      fill: hsla(30, 100%, 50%, 0.85);
      transform-origin: 256px 256px;
      transform: rotate(0deg);
    `,
    face: css`
      fill: none;
      stroke: ${theme.isLight ? theme.palette.greenBase : theme.palette.blue95};
      stroke-width: 32px;
    `,
    centerCircle: css`
      fill: hsla(255, 100%, 50%, 0.75);
    `,
    velocityText: css`
      font-size: 9rem;
      /* stroke: white; */
      fill: hsl(120, 100%, 50%);
      font-weight: bold;
      /* font-family: 'Courier New', Courier, monospace; */
      text-anchor: middle;
      dominant-baseline: middle;
    `,
    text: css`
      font-weight: bold;
      font-family: 'Courier New', Courier, monospace;
      font-size: 3rem;
    `,
    velocityLegend: css`
      fill: white;
      font-size: 1.5em;
      font-family: 'Courier New', Courier, monospace;
      font-weight: bold;
      text-anchor: middle;
    `,
  };
});
