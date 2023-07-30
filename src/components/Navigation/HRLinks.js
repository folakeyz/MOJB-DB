import React, { Fragment, useContext, useState } from "react";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { adminLinks } from "./link";
import styles from "./styles.module.css";

const HRLinks = ({ name, roles }) => {
  const [newItems, setNewItems] = useState({});
  const navigate = useNavigate();

  const toggleHandler = (id) => {
    setNewItems((txt) => ({ ...txt, [id]: !txt[id] }));
  };

  const hasPermission = (roles, allowed) => {
    var registered = true;

    // for (var i = 0; i < roles?.length; i++) {
    for (var x = 0; x < allowed?.length; x++) {
      if (roles?.roleType === allowed[x]) {
        registered = true;
        break;
      }
    }
    // }
    return registered;
  };

  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
    window.location.reload(false);
    navigate("/");
  };

  return (
    <>
      <div className={styles.links}>
        <ul>
          {adminLinks.map(
            (item, i) =>
              hasPermission(roles, item?.allowed) && (
                <Fragment key={i}>
                  {item?.children ? (
                    <div className={styles.childContainer}>
                      <li
                        className={
                          name === item?.name ? styles.active : undefined
                        }
                        onClick={() => toggleHandler(i)}
                      >
                        <span to={item.route}>
                          <item.Icon />
                          {item.name}
                          &nbsp;&nbsp;
                          <FaCaretDown />
                        </span>
                      </li>

                      {newItems[i] && (
                        <div className={styles.child}>
                          <ul>
                            {item?.children?.map((child, x) => (
                              <li key={x}>
                                <Link to={child.route}>
                                  <child.Icon />
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    hasPermission(roles, item?.allowed) && (
                      <li
                        key={i}
                        className={
                          name === item?.name ? styles.active : undefined
                        }
                      >
                        <Link to={item.route}>
                          <item.Icon />
                          {item.name}
                        </Link>
                      </li>
                    )
                  )}
                </Fragment>
              )
          )}
          <li>
            <span onClick={logout}>
              <FaSignOutAlt />
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HRLinks;
