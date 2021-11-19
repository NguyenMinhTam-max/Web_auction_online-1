import { Container, NavDropdown, Row, Col, Dropdown, NavLink } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
export const CategoryItem = ({ id, title, items }) => {
    return (
        <>

            <NavDropdown
                id="nav-dropdown-dark-example"
                drop="end"
                title={title} //syntax to add variable's value to html's attribute
                menuVariant="dark"
            >

                {items?.length > 0 && items.map((item, index) => (
                    // text decoration == none to delete hyperlink deco
                    <Container className="eventsNav pt-0 mt-0" >
                        <Dropdown.Item>
                            <Link to={`/category/${item.catID}`} style={{ textDecoration: "none", color: "white"}}>
                                {item.catName}
                            </Link>
                        </Dropdown.Item>
                    </Container>

                ))}

            </NavDropdown>
        </>
    )
}
export default CategoryItem;