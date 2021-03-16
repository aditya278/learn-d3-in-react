import { useState, createContext } from 'react';

const toolTipContext = createContext();

const useToolTip = () => {
    const [toolTip, setToolTip] = useState(false);

    return { toolTip, setToolTip };
};

export { useToolTip, toolTipContext };