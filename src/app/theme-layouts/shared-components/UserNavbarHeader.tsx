import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/user/userSlice';

const Root = styled('div')(({ theme }) => ({
	'& .username, & .email': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},

	'& .avatar': {
		background: theme.palette.background.default,
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		bottom: 0,
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader() {
	const user = useSelector(selectUser);

	return (
		<Root className="user shadow-0 relative flex flex-col items-center justify-center p-16 pb-14">
			<div className="mb-24 flex items-center justify-center">
				<Avatar
					sx={{
						backgroundColor: 'background.paper',
						color: 'text.secondary'
					}}
					className="avatar text-32 h-96 w-96 font-bold"
					src={user.data.photoURL}
					alt={user.data.displayName}
				>
					{user.data.displayName.charAt(0)}
				</Avatar>
			</div>
			<Typography className="username text-14 whitespace-nowrap font-medium">{user.data.displayName}</Typography>
			<Typography
				className="email text-13 whitespace-nowrap font-medium"
				color="text.secondary"
			>
				{user.data.email}
			</Typography>
		</Root>
	);
}

export default UserNavbarHeader;
