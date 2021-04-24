import { useRouter } from 'next/router';
export default function Episode() {
    const router = useRouter()
    //const query = router.query
    return (
        <h1>{router.query.episode}</h1>
    )
}