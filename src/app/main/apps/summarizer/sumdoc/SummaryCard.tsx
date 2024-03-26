import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const renderSummaryPoints = (summaryText) => {
    // Split the summary into an array of points based on "-"
    // and filter out any empty strings that might occur due to split
    const points = summaryText.split('-').filter(point => point.trim() !== '');
    return points.map((point, index) => (
        // Render each point as a paragraph, trimming whitespace
        <Typography key={index} variant="body2" paragraph>
            -{point.trim()}
        </Typography>
    ));
};

export default function SummaryCard({ model, summary }) {
    const [showModel, setShowModel] = React.useState(false);

    const toggleModelVisibility = () => {
        setShowModel(!showModel);
    };

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <IconButton onClick={toggleModelVisibility} size="small">
                                {showModel ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
                            </IconButton>
                            Model: <b>{showModel ? model : '****'}</b>
                        </Typography>
                        {/* <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography> */}
                        <Typography variant="body2">
                            {renderSummaryPoints(summary)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ padding: "10px" }} size="small">More Action...</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    );
}