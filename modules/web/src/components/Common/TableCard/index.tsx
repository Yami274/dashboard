// src/component/TableCard.js
import React, { ChangeEvent } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

export interface ColumnDefinition<T> {
  name?: string
  key?: string;
  render?: (row: T) => React.ReactNode | string | undefined;
  renderOperation?: boolean;
}

interface TableCardProps<T> {
  addButtonLabel?: string;
  title?: string;
  columns?: ColumnDefinition<T>[];
  data?: T[];
  onQueryClick?: (event: React.MouseEvent, data: T, index: number) => void;
  onAddClick?: (event: React.MouseEvent) => void;
  onRefreshClick?: (event: React.MouseEvent) => void,
  onViewOptionsClick?: (event: React.MouseEvent) => void;
  onDetailClick?: (event: React.MouseEvent, data: T, index: number) => void;
  onDeleteClick?: (event: React.MouseEvent, data: T, index: number) => void;
  showAddButton?: boolean;
  specialHandling?: boolean;
  specialBtnHandling?: boolean;
  detailButtonLabel?: string;
  deleteButtonLabel?: string;
  noTableHeader?: boolean;
  noPagination?: boolean;
  // New: Support useProTable Hook state
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
  };
  onPaginationChange?: (page: number, pageSize: number) => void;
  loading?: boolean;
}

export function TableCard<T>({
  title,
  addButtonLabel,
  columns,
  data,
  onQueryClick,
  onAddClick,
  onRefreshClick,
  onViewOptionsClick,
  onDetailClick,
  onDeleteClick,
  detailButtonLabel,
  deleteButtonLabel,
  specialHandling = false, // New props for special handling
  specialBtnHandling = false, // New props for button special handling
  noTableHeader=false,
  noPagination=false,
  // New: Support useProTable Hook state
  pagination,
  onPaginationChange,
  loading = false,
}: TableCardProps<T>) {
  // Compatible with old version: if pagination is not passed, use internal state
  const [internalPage, setInternalPage] = React.useState(0);
  const [internalRowsPerPage, setInternalRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    if (onPaginationChange && pagination) {
      // Use useProTable Hook pagination
      onPaginationChange(newPage + 1, pagination.pageSize);
    } else {
      // Use internal state
      setInternalPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    if (onPaginationChange && pagination) {
      // Use useProTable Hook pagination
      onPaginationChange(1, newPageSize);
    } else {
      // Use internal state
      setInternalRowsPerPage(newPageSize);
      setInternalPage(0);
    }
  };

  // Determine current pagination state
  const currentPage = pagination ? pagination.current - 1 : internalPage;
  const currentPageSize = pagination ? pagination.pageSize : internalRowsPerPage;
  const total = pagination ? pagination.total : (data?.length || 0);

  let paginatedData = data;
  if (!noPagination && !pagination) {
    // Only perform client-side pagination when not using useProTable Hook
    paginatedData = data?.slice(currentPage * currentPageSize, currentPage * currentPageSize + currentPageSize);
  }

  return (
    <Paper>
      { !noTableHeader && (
        <Box sx={{ padding: '16px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            {!specialBtnHandling  ? (
                        <Button onClick={onAddClick} variant="contained" startIcon={<AddIcon />}>
                        {addButtonLabel}
                      </Button>
                      ) : (
                      ''
                      )}
            <IconButton onClick={onRefreshClick}>
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={onViewOptionsClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((col, index) => (
                <TableCell key={index} sx={{ textAlign: 'center', padding: '16px' }}>
                  {typeof col === 'string' ? col : col.name}
                </TableCell>
              ))}
              <TableCell sx={{ textAlign: 'center', padding: '16px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {
                  columns?.map((col: ColumnDefinition<T>, colIndex: number) => {
                    if (col.renderOperation) {
                      return (
                        <TableCell key={colIndex} sx={{ textAlign: 'center' }}>
                          {detailButtonLabel && (
                            <Button onClick={(event) => onDetailClick?.(event, row, colIndex)} sx={{ color: '#2F54EB', marginRight: '8px' }}>
                              {detailButtonLabel}
                            </Button>
                          )}
                          {deleteButtonLabel && (
                            <Button onClick={(event) => onDeleteClick?.(event, row, colIndex)} sx={{ color: '#ff4d4f' }}>
                              {deleteButtonLabel}
                            </Button>
                          )}
                        </TableCell>
                      )
                    }

                    return <TableCell key={colIndex} sx={{ textAlign: 'center' }}>{col.render ? col.render(row) : (row as any)[colIndex]}</TableCell>
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!noPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={currentPageSize}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
