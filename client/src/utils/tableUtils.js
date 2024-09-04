import Image from '../ui/Image';
import screwfixDiv2CircleImage from '../images/screwfix_circle_logo.png';
import badgersDiv1CircleImage from '../images/badger_circle_logo.png';
import { TeamAndManagerName } from '../ui/TableComponents/TeamAndManagerName';

// const RenderLeagueImage = (row) => {
//   const isBadger = (row.division === 95564)
//   return (
//     <Image src={isBadger ? badgersDiv1CircleImage : screwfixDiv2CircleImage} width={'20px'} />
//   )
// }

export const leagueColumns = [
  {
    Header: '#',
    accessor: 'rank',
    Cell: (row) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.value}</div>,
    width: 20,
    minWidth: 20,
    maxWidth: 20,
    sortable: false,
    canSort: false
  },
  // {
  //   Header: 'Lg.',
  //   Cell: (row) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.value}</div>,
  //   accessor: (row) => RenderLeagueImage(row),
  //   width: 10,
  // },
  {
    Header: 'Team',
    accessor: (row) => <TeamAndManagerName rowInfo={row} />,
    width: 300,
    sortable: false,
  },
  {
    Header: 'W',
    accessor: 'matches_won',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
  },
  {
    Header: 'D',
    accessor: 'matches_drawn',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
  },
  {
    Header: 'L',
    accessor: 'matches_lost',
    width: 10,
    minWidth: 10,
    maxWidth: 10,
    sortable: false,
  },
  {
    Header: 'LP',
    accessor: 'total',
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    sortable: true,
  },
  {
    Header: 'TP',
    accessor: 'points_for',
    width: 50,
    minWidth: 50,
    maxWidth: 50,
    sortable: true,
  },
];