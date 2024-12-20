export interface IIconProps {
  size?: string | number;
  color?: string;
}

export const defaultIconProps: Required<IIconProps> = {
  size: "1em",
  color: "currentColor",
};
