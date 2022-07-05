import React from "react";
import ReactDOM from "react-dom";

import { Button, Color, Text, Margin, Select } from "@ds.e/react";
import "@ds.e/scss/lib/Button";
import "@ds.e/scss/lib/Utilities";
import "@ds.e/scss/lib/Margin";
import "@ds.e/scss/lib/Select";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "sweet-pink",
  },
];

ReactDOM.render(
  <div>
    <Button label={"Example Button"} />
    <Color hexCode="#000" />
    <div style={{ padding: "40px" }}>
      <Select options={options} />
    </div>
    <Margin space="none">
      <Text>This is a text</Text>
    </Margin>
  </div>,
  document.querySelector("#root")
);
