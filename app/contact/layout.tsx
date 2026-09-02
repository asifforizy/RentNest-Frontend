import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getMe';


const ContactLayout = async (
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
        </div>
    )
}

export default ContactLayout