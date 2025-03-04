import { Avatar, Select } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { LuBell } from "react-icons/lu";
import ReactCountryFlag from "react-country-flag";
import { FaSearch } from "react-icons/fa";


const HeaderLayout = () => {
    const handleChangeLang = (value: string) => {
        console.log(`change language to ${value}`);
    };
    const handleSearch = (value: string) => {
        console.log('btn search clicked:', value)
    }
    return <>
        <div className="wt-header-container d-flex justify-content-between">
            <div className="wt-logo-search d-flex align-items-center ms-4">
                <div className="wt-logo">logo</div>
                <div className="wt-search d-flex align-items-center">
                    <input id="wtid-search" type="text" className="wt-search-input" placeholder="Tìm kiếm..." onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch((document.getElementById('wtid-search') as HTMLInputElement).value); // Gọi hàm tìm kiếm
                        }
                    }} />
                    <FaSearch className="ms-1 pointer" onClick={() => { handleSearch((document.getElementById('wtid-search') as HTMLInputElement).value) }} />
                </div>
            </div>
            <div className="d-flex gap-4 me-5 align-items-center">
                <div>
                    <Select
                        defaultValue="vi"
                        style={{ width: 120 }}
                        onChange={handleChangeLang}
                        dropdownRender={(menu) => (
                            <div className="wt-lang-item-wrap">{menu}</div>
                        )}
                        options={[
                            { value: 'vi', label: <div className="d-flex align-items-center justify-content-around"><div style={{ color: "#fff", fontWeight: 'bold' }}>Tiếng Việt</div> <ReactCountryFlag countryCode="VN" svg /></div> },
                            { value: 'en', label: <div className="d-flex align-items-center justify-content-around"><div style={{ color: "#fff", fontWeight: 'bold' }}>English</div> <ReactCountryFlag countryCode="US" svg /></div> },
                        ]}
                        suffixIcon={null}
                    />
                </div>
                <div className="wt-bell-wrap"><LuBell /></div>
                <Avatar size="large" icon={<UserOutlined />} />
            </div>
        </div>
    </>
}
export default HeaderLayout;