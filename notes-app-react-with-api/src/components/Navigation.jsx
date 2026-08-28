import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { MdGTranslate } from 'react-icons/md';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function Navigation({ name, logout }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { locale, toggleLocale } = useContext(LocaleContext);

    return (
        <nav className="navigation">
            <ul>
                {name && (
                    <li>
                        <Link to="/archives">
                            {locale === 'id' ? 'Arsip' : 'Archived'}
                        </Link>
                    </li>
                )}

                <li>
                    <button
                        type="button"
                        className="toggle-locale"
                        onClick={toggleLocale}
                        title={locale === 'id' ? 'Ubah Bahasa' : 'Change Language'}
                    >
                        <MdGTranslate />
                    </button>
                </li>

                <li>
                    <button
                        type="button"
                        className="toggle-theme"
                        onClick={toggleTheme}
                        title={locale === 'id' ? 'Ubah Tema' : 'Change Theme'}
                    >
                        {theme === 'dark' ? <FiSun /> : <FiMoon />}
                    </button>
                </li>

                {name && (
                    <li>
                        <button
                            type="button"
                            className="button-logout"
                            onClick={logout}
                            title={locale === 'id' ? 'Keluar' : 'Logout'}
                        >
                            <FiLogOut /> {name}
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    name: PropTypes.string,
    logout: PropTypes.func,
};

Navigation.defaultProps = {
    name: null,
    logout: null,
};

export default Navigation;