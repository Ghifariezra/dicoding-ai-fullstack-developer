import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';
import { FiCheck } from 'react-icons/fi';

class AddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
        };

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onInputBodyHandler = this.onInputBodyHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onTitleChangeHandler(event) {
        this.setState({ title: event.target.value });
    }

    onInputBodyHandler(event) {
        this.setState({ body: event.target.innerHTML });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        addNote({
            title: this.state.title,
            body: this.state.body,
        });
        this.props.navigate('/');
    }

    render() {
        return (
            <section className="add-new-page">
                <div className="add-new-page__input">
                    <input
                        className="add-new-page__input__title"
                        type="text"
                        placeholder="Catatan rahasia"
                        value={this.state.title}
                        onChange={this.onTitleChangeHandler}
                    />
                    <div
                        className="add-new-page__input__body"
                        contentEditable
                        data-placeholder="Sebenarnya saya adalah..."
                        onInput={this.onInputBodyHandler}
                    />
                </div>
                <div className="add-new-page__action">
                    <button className="action" type="button" title="Simpan" onClick={this.onSubmitHandler}>
                        <FiCheck />
                    </button>
                </div>
            </section>
        );
    }
}

AddPage.propTypes = {
    navigate: PropTypes.func.isRequired,
};

function AddPageWrapper() {
    const navigate = useNavigate();

    return <AddPage navigate={navigate} />;
}

export default AddPageWrapper;