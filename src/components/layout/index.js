import Header from './header/index'

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
};

export default Layout;