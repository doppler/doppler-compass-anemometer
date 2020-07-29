import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const CompassAnemometer: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const dir = data.series
    .map(series => series.fields.find(field => field.name === 'dir'))
    .map(field => field?.values.get(field.values.length - 1))[0];

  const mps = data.series
    .map(series => series.fields.find(field => field.name === 'mps'))
    .map(field => field?.values.get(field.values.length - 1))[1];

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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={width} height={height}>
        <defs>
          <path id="hash" d="M 250 3 L 256 29 L 262 3 Z" fill="black" />
          <mask id="hash-mask">
            <circle cx="256" cy="256" r="240" stroke="white" stroke-width="32px" />

            <g>
              <text x="243" y="30" fill="black" className={styles.text}>
                N
              </text>
              <text x="483" y="269" fill="black" className={styles.text}>
                E
              </text>
              <text x="243" y="509" fill="black" className={styles.text}>
                S
              </text>
              <text x="4" y="269" fill="black" className={styles.text}>
                W
              </text>

              <use href="#hash" transform="rotate(22.5, 256, 256)" />
              <use href="#hash" transform="rotate(45, 256, 256)" />
              <use href="#hash" transform="rotate(67.5, 256, 256)" />
              <use href="#hash" transform="rotate(112.5, 256, 256)" />
              <use href="#hash" transform="rotate(135, 256, 256)" />
              <use href="#hash" transform="rotate(157.5, 256, 256)" />
              <use href="#hash" transform="rotate(202.5, 256, 256)" />
              <use href="#hash" transform="rotate(225, 256, 256)" />
              <use href="#hash" transform="rotate(247.5, 256, 256)" />
              <use href="#hash" transform="rotate(292.5, 256, 256)" />
              <use href="#hash" transform="rotate(315, 256, 256)" />
              <use href="#hash" transform="rotate(337.5, 256, 256)" />
            </g>
          </mask>
        </defs>

        <path
          className={styles.directionIndicator}
          id="directionIndicator"
          d="M 258 35 L 260 256 L 314 314 L 256 480 L 197 314 L 252 256 L 254 35 Z"
          style={{ transform: `rotate(${dir}deg)` }}
        />

        <circle className={styles.face} id="face" cx="256" cy="256" r="240" mask="url(#hash-mask)" />

        <circle
          className={cx(
            styles.centerCircle,
            css`
              opacity: 0.85;
            `
          )}
          id="centerCircle"
          cx="256"
          cy="256"
          r="82.9"
        />

        <text className={styles.velocityText} id="velocityText" x="256" y="266">
          {Math.round(mps * 2.237)}
        </text>
        <text className={styles.velocityLegend} x="256" y="325">
          {dir}°
        </text>
      </svg>
    </div>
  );
};

const getStyles = stylesFactory(theme => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    direction: css`
      fill: black;
    `,
    directionIndicator: css`
      fill: ${theme.palette.orange};
      transform-origin: 256px 256px;
      transform: rotate(0deg);
    `,
    face: css`
      fill: none;
      stroke: ${theme.palette.yellow};
      stroke-width: 32px;
    `,
    centerCircle: css`
      fill: ${theme.colors.bg1};
    `,
    velocityText: css`
      font-size: 9rem;
      fill: ${theme.palette.yellow};
      font-weight: bold;
      text-anchor: middle;
      dominant-baseline: middle;
    `,
    text: css`
      fill: black;
      font-weight: bold;
      font-family: 'Courier New', Courier, monospace;
      font-size: 3rem;
    `,
    velocityLegend: css`
      fill: ${theme.palette.yellow};
      font-size: 1.5em;
      font-weight: bold;
      text-anchor: middle;
    `,
  };
});
