import { FontSize } from '@ds.e/foundation';
import React from 'react';

const Text = ({ size = FontSize.base, children }) => {
    const className = `dse-text dse-text-${size}`;
    return React.createElement("p", { className: className }, children);
};

export { Text as default };
//# sourceMappingURL=Text.js.map
