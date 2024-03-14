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

export default function SummaryCardMock() {
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
                            Model: <b>{showModel ? 'gpt-4' : '****'}</b>
                        </Typography>
                        {/* <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography> */}
                        <Typography variant="body2">
                            -The document is a portion of a will or trust document, specifically addressing the distribution of life insurance proceeds following the author's death. The beneficiaries of these proceeds are the author's children, John Washington and Sally Washington. The document does not provide the author's name, which is a missing piece of information.

                            -The document stipulates that if any life insurance policies name the trust under Article SIXTH as the beneficiary, the proceeds are to be given for the benefit of John and Sally Washington. The exact nature or details of Article SIXTH are not specified in the document, which is a missing detail.

                            -The distribution method of the insurance proceeds is dependent on the age of the beneficiaries at the time of the author's death. If both beneficiaries are 21 years or older, the proceeds will be distributed equally between them, free of trust. However, if either beneficiary is under 21 years, the proceeds will not vest in them directly.

                            -In the case of beneficiaries being under 21, the proceeds are to be given to trustees in trust as a single trust for the beneficiaries' benefit. The trustees are not named in the document, which is a missing detail. The trustees have the responsibility to manage, invest, and reinvest the trust assets, collect income from them, and pay to or for the benefit of the beneficiaries as they see fit, without any requirement of equality.

                            -The trustees are also authorized to accumulate any income not paid or applied and add it to the principal of the trust annually. The document does not specify any guidelines or restrictions on the trustees' discretion in managing the trust, which could be seen as a missing detail.

                            -Once all beneficiaries reach the age of 21, any remaining trust assets are to be equally distributed to the beneficiaries, free of trust and without adjustment for amounts previously distributed. The document does not specify what happens if a beneficiary dies before reaching the age of 21, which is another missing detail.

                            -The document does not provide any details about the life insurance policies, such as the provider, policy number, or total value of the proceeds, which are all important missing details.

                            -There are no specific dates, locations, or cases mentioned in the document. The document also does not specify any agreements within contracts, proper nouns (other than the beneficiaries' names), or specific terminology or systems. These are all missing details that could potentially be important in a legal context.
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