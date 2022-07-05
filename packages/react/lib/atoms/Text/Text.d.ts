import { FontSize } from "@ds.e/foundation";
import React from "react";
interface TextProps {
    size?: keyof typeof FontSize;
}
declare const Text: React.FC<TextProps>;
export default Text;
