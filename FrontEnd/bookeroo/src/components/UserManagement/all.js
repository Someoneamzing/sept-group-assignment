import axios from 'axios';

const fetchAllUsers = async () => {
    const config = {
        config: 'GET',
        url: 'http://localhost:8081/api/users/all',
        headers: {
            'Content-Type': 'application-json',
        },
    };
    try {
        const res = await axios(config);
        return res.data._embedded.users;
    } catch (e) {
        console.log(e);
        return null;
    }
};

function ViewAllUsers() {
    return (
        <Container maxWidth="lg">
            <h1>(debug) view all books</h1>
            <Box display="flex" flexDirection="column" width="100%">
                {fetchAllUsers.map((n) => (
                    <Suspense fallback="loading book" key={n}>
                        <BookListItem bookId={n} />
                    </Suspense>
                ))}
            </Box>
        </Container>
    );
}

export default function ViewAllBooksPage() {
    return (
        <Suspense fallback="loading all books">
            <ViewAllBooksLayout />
        </Suspense>
    );
}
