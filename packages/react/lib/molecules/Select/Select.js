import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40,
    ESC: 27,
    UP_ARROW: 38,
};
const getNextOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === options.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
const getPreviousOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === 0) {
        return options.length - 1;
    }
    return currentIndex - 1;
};
const Select = ({ options = [], label = "Please select an option...", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const labelRef = useRef(null);
    const [optionRef, setOptionRef] = useState([]);
    const onOptionSelected = (option, optionIndex) => {
        if (handler) {
            handler(option, optionIndex);
        }
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 1);
    }, [labelRef.current?.offsetHeight]);
    let selectedOption = null;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }
    const highlightedItem = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonDown = (event) => {
        event.preventDefault();
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE].includes(event.keyCode)) {
            setIsOpen(true);
            //Set focus on the list
            highlightedItem(0);
        }
    };
    useEffect(() => {
        setOptionRef(options.map((_) => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRef[highlightedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen, highlightedIndex]);
    const onOptionKeyDown = (event) => {
        if (event.keyCode === KEY_CODES.ESC) {
            setIsOpen(false);
            return;
        }
        if (event.keyCode === KEY_CODES.DOWN_ARROW) {
            highlightedItem(getNextOptionIndex(highlightedIndex, options));
        }
        if (event.keyCode === KEY_CODES.UP_ARROW) {
            highlightedItem(getPreviousOptionIndex(highlightedIndex, options));
        }
        if (event.keyCode === KEY_CODES.ENTER) {
            onOptionSelected(options[highlightedIndex], highlightedIndex);
        }
    };
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { onKeyDown: onButtonDown, "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, "aria-controls": "dse-select-list", className: "dse-select__label", ref: labelRef, onClick: () => onLabelClick() },
            React.createElement(Text, null, selectedOption === null ? label : selectedOption.label),
            React.createElement("svg", { width: "1rem", height: "1rem", xmlns: "http://www.w3.org/2000/svg", className: `dse-select__caret ${isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "2" },
                React.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M19 9l-7 7-7-7" }))),
        isOpen ? (React.createElement("ul", { role: "menu", id: "dse-select-list", className: "dse-select__overlay", style: { top: overlayTop } }, options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlightedIndex === optionIndex;
            const ref = optionRef[optionIndex];
            const renderOptionProps = {
                option,
                isSelected,
                getOptionRecommendedProps: (overrideProps) => {
                    return {
                        className: `dse-select__option 
                  ${isSelected ? "dse-select__option--selected" : ""}
                  ${isHighlighted ? "dse-select__option--highlighted" : ""}`,
                        role: "menitemradio",
                        "aria-label": option.label,
                        "aria-checked": isSelected ? true : undefined,
                        ref: ref,
                        onKeyDown: onOptionKeyDown,
                        tabIndex: isHighlighted ? -1 : 0,
                        onMouseEnter: () => highlightedItem(optionIndex),
                        onMouseLeave: () => highlightedItem(null),
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    };
                },
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { ...renderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                isSelected ? (React.createElement("svg", { width: "1rem", height: "1rem", className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }))) : null));
        }))) : null));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
