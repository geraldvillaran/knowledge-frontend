import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Model: <b>GPT-4</b>
            </Typography>
            <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                - The Cuban Missile Crisis occurred in October 1962 and was a confrontation between the United States and the Soviet Union during the Cold War.
                - The crisis was unique in that it was primarily handled by the White House and the Kremlin, with little input from other government agencies.
                - After the failed Bay of Pigs invasion, Soviet premier Nikita Khrushchev agreed to place nuclear missiles in Cuba to deter future U.S. invasions.
                - U.S. intelligence discovered evidence of the Soviet arms build-up in Cuba and President John F. Kennedy issued a public warning against the introduction of offensive weapons into Cuba.
                - On October 14, 1962, a U.S. U-2 aircraft took pictures of missile sites under construction in Cuba, which precipitated the onset of the Cuban Missile Crisis.
                - Kennedy's advisors were divided on how to respond, with some advocating for an air strike and invasion, while others favored stern warnings.
                - Kennedy decided on a naval "quarantine" of Cuba, which was legally different from a blockade, and allowed the U.S. to receive support from the Organization of American States.
                - Kennedy also sent a letter to Khrushchev demanding the dismantling of the missile bases and the return of all offensive weapons to the Soviet Union.
                - Kennedy went on national television to inform the public of the crisis and the U.S. response, and made it clear that any nuclear missile launched from Cuba would be considered an attack by the Soviet Union on the U.S.
                - The U.S. military was put on DEFCON 3, and later DEFCON 2, as the crisis escalated.
                - On October 26, Khrushchev sent a message proposing a resolution in which the Soviets would remove their missiles from Cuba if the U.S. promised not to invade.
                - The next day, Khrushchev sent another message demanding the removal of U.S. Jupiter missiles from Turkey as part of the deal.
                - Kennedy ignored the second message and responded to the first, proposing steps for the removal of Soviet missiles from Cuba and a guarantee that the U.S. would not attack Cuba.
                - Robert Kennedy met with the Soviet ambassador and indicated that the U.S. was planning to remove the Jupiter missiles from Turkey anyway, but this could not be part of any public resolution.
                - On October 28, Khrushchev announced that the Soviet missiles would be dismantled and removed from Cuba, ending the crisis.
                - The U.S. ended the quarantine on November 20, 1962, and the Jupiter missiles were removed from Turkey in April 1963.
                - The crisis strengthened Kennedy's image and led to the establishment of the "Hotline" between the White House and the Kremlin, as well as the first steps towards a nuclear Test Ban Treaty.
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

export default function SummaryCard() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}