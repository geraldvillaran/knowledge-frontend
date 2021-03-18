import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseUtils from '@fuse/utils';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import FuseNavItem from '../FuseNavItem';

const useStyles = makeStyles(theme => ({
	item: props => ({
		height: 40,
		width: '100%',
		borderRadius: '6px',
		margin: '24px 0 4px 0',
		paddingRight: 12,
		paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
		color: fade(theme.palette.text.primary, 0.7),
		fontWeight: 600,
		letterSpacing: '0.025em'
	})
}));

function FuseNavVerticalGroup(props) {
	const userRole = useSelector(({ auth }) => auth.user.role);
	const dispatch = useDispatch();

	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { item, nestedLevel } = props;
	const classes = useStyles({
		itemPadding: nestedLevel > 0 ? 28 + nestedLevel * 16 : 12
	});

	const hasPermission = useMemo(() => FuseUtils.hasPermission(item.auth, userRole), [item.auth, userRole]);

	return useMemo(
		() =>
			!hasPermission ? null : (
				<>
					<ListSubheader
						disableSticky
						className={clsx(
							classes.item,
							'list-subheader flex items-center',
							!item.url && 'cursor-default'
						)}
						onClick={ev => mdDown && dispatch(navbarCloseMobile())}
						component={item.url ? NavLinkAdapter : 'li'}
						to={item.url}
						role="button"
					>
						<span className="list-subheader-text uppercase text-12">{item.title}</span>
					</ListSubheader>

					{item.children && (
						<>
							{item.children.map(_item => (
								<FuseNavItem
									key={_item.id}
									type={`vertical-${_item.type}`}
									item={_item}
									nestedLevel={nestedLevel}
								/>
							))}
						</>
					)}
				</>
			),
		[classes.item, dispatch, hasPermission, item.children, item.title, item.url, mdDown, nestedLevel]
	);
}

FuseNavVerticalGroup.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		children: PropTypes.array
	})
};

FuseNavVerticalGroup.defaultProps = {};

const NavVerticalGroup = FuseNavVerticalGroup;

export default NavVerticalGroup;
