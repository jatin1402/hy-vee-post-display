import React, { useState, useEffect, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
    CircularProgress,
    Alert
} from '@mui/material';
import { usePosts } from '../hooks/usePosts';

type Order = 'asc' | 'desc';
type OrderBy = 'id' | 'title' | 'body';


// i am taking the userId and generating a colour based on them, this would give the records of same user in same colour.

const generatePastelColor = (userId: number): string => {
    const hue = (userId * 137.508) % 360; 
    return `hsl(${hue}, 35%, 95%)`; 
};

const PostsTable: React.FC = () => {
    const { posts, loading, error, fetchPosts } = usePosts();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<OrderBy>('id');

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleRequestSort = (property: OrderBy) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedPosts = useMemo(() => 
        [...posts].sort((a, b) => {
            const isAsc = order === 'asc';
            if (orderBy === 'id') {
                return isAsc ? a.id - b.id : b.id - a.id;
            }
            return isAsc
                ? a[orderBy].localeCompare(b[orderBy])
                : b[orderBy].localeCompare(a[orderBy]);
        }), [posts, order, orderBy]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '648px' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {['id', 'title', 'body'].map((column) => (
                                <TableCell key={column}>
                                    <TableSortLabel
                                        active={orderBy === column}
                                        direction={orderBy === column ? order : 'asc'}
                                        onClick={() => handleRequestSort(column as OrderBy)}
                                    >
                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPosts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((post) => (
                                <TableRow 
                                    key={post.id}
                                    sx={{
                                        backgroundColor: generatePastelColor(post.userId),
                                        cursor: "pointer"
                                    }}
                                >
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PostsTable;