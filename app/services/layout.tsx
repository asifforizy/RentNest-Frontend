import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getMe';


const ServicesLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {

    const user = await getMe();
    return (
        <div>
            <Navbar user={user}></Navbar>
            {children}
            <Footer></Footer>
        </div>
    )
}

export default ServicesLayout