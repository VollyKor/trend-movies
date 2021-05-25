import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import {
  SelectionState,
  IntegratedSelection,
  SortingState,
  IntegratedSorting,
  EditingState,
  PagingState,
  CustomPaging,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  TableEditRow,
  TableEditColumn,
  TableFilterRow,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';

import Container from 'components/Container';

import req from '../service/apiRequest';

const styles = theme => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
    },
  },
  button: {
    margin: theme.spacing(0, 1),
  },
});

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
);

export const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase,
);

const TableRow = ({ row, ...restProps }) => {
  return (
    <Table.Row
      {...restProps}
      onClick={() => console.log(JSON.stringify(row))}
      style={{
        cursor: 'pointer',
        ...styles,
      }}
    />
  );
};

const TableHeaderContentBase = ({
  column,
  children,
  classes,
  ...restProps
}) => (
  <TableHeaderRow.Content column={column} {...restProps}>
    <>
      {children}
      {column.name === 'id' ? (
        <IconButton
          className={classes.button}
          onClick={() => console.log('Hello')}
        >
          <VisibilityOff />
        </IconButton>
      ) : null}
    </>
  </TableHeaderRow.Content>
);

export const TableHeaderContent = withStyles(styles, {
  name: 'TableHeaderContent',
})(TableHeaderContentBase);

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = event => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? '' : value}
      inputProps={{
        min: 0,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  );
};

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

const FilmsTable = () => {
  const [page, setPage] = useState(0);
  const [filmsData, setFilmsData] = useState(null);
  const [rows, setRows] = useState([]);
  const [colums, setColumns] = useState([]);
  const [selection, setSelection] = useState([]);
  const [columnOrder, setColumnOrder] = useState();
  const [filters, setFilters] = useState([]);
  const [sorting, setSorting] = useState([
    { columnName: 'vote_count', direction: 'desc' },
  ]);
  const [filteringStateColumnExtensions] = useState([
    { columnName: 'id', filteringEnabled: false },
  ]);

  const [currencyColumns] = useState(['amount']);
  const [currencyFilterOperations] = useState([
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
  ]);

  const [tableColumnExtensions] = useState([
    {
      columnName: 'id',
      align: 'center',
      width: '6%',
    },
    {
      columnName: 'vote_average',
      align: 'center',
      width: '7%',
    },
    {
      columnName: 'vote_count',
      align: 'center',
      width: '6%',
    },
    {
      columnName: 'backdrop_path',
      align: 'center',
      width: '15%',
      wordWrapEnabled: true,
    },
    {
      columnName: 'title',
      align: 'center',
      width: '10%',
      wordWrapEnabled: true,
    },
    {
      columnName: 'original_language',
      align: 'center',
      width: '2%',
    },
    {
      columnName: 'adult',
      align: 'center',
      width: '5%',
    },
  ]);

  const isVisible = filmsData?.results?.length > 0 ? true : false;

  useMemo(() => {
    if (!filmsData) return;

    const keys = Object.keys(filmsData.results[0]);
    const columnsArr = keys.map(e => ({ name: e, title: e }));

    setColumnOrder(keys);
    setRows(filmsData.results);
    setColumns(columnsArr);
  }, [filmsData]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }

    if (changed) {
      changedRows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row,
      );
    }

    if (deleted) {
      changedRows = rows.filter((_, i) => i !== deleted[0]);
    }
    setRows(changedRows);
    setSelection([]);
  };

  useEffect(() => {
    req.getTrendFilms(page + 1).then(data => {
      setFilmsData(data);
    });
  }, [page]);

  const FilterIcon = ({ type, ...restProps }) => (
    <TableFilterRow.Icon type={type} {...restProps} />
  );

  return (
    <Container>
      <span>Total rows selected: {selection.length}</span>
      <Paper style={{ marginTop: '20px' }}>
        {isVisible && (
          <Grid rows={rows} columns={colums}>
            <SelectionState
              selection={selection}
              onSelectionChange={value => {
                setSelection(value);
              }}
              getRowId={() => console.log('click')}
            />
            <IntegratedSelection />

            <SortingState sorting={sorting} onSortingChange={setSorting} />
            <IntegratedSorting />

            <EditingState onCommitChanges={commitChanges} />

            <DataTypeProvider
              for={currencyColumns}
              availableFilterOperations={currencyFilterOperations}
              editorComponent={CurrencyEditor}
            />

            <FilteringState
              filters={filters}
              onFiltersChange={setFilters}
              columnExtensions={filteringStateColumnExtensions}
            />
            <IntegratedFiltering />

            <PagingState
              defaultCurrentPage={page}
              pageSize={20}
              onCurrentPageChange={page => setPage(page)}
            />
            <CustomPaging totalCount={filmsData.total_pages} />
            <PagingPanel />

            <Table
              rowComponent={TableRow}
              tableComponent={TableComponent}
              columnExtensions={tableColumnExtensions}
            />
            <TableColumnReordering
              order={columnOrder}
              onOrderChange={setColumnOrder}
            />

            <TableSelection showSelectAll />

            <TableHeaderRow
              contentComponent={TableHeaderContent}
              showSortingControls
            />

            <TableEditRow />
            <TableFilterRow showFilterSelector iconComponent={FilterIcon} />
            <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default FilmsTable;
