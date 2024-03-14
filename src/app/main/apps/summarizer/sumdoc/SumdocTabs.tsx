import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export interface BasicTabsProps {
    activeTab: number;
    contents: (string | JSX.Element)[];
}

const BasicTabs: React.FC<BasicTabsProps> = ({ activeTab, contents }) => {
    return (
        <div>
            {contents.map((content, index) => (
                <CustomTabPanel key={index} value={activeTab} index={index}>
                    {content}
                </CustomTabPanel>
            ))}
        </div>
    );
};

export default BasicTabs;