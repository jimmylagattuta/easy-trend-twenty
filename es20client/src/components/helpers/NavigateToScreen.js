import React from 'react';
import { useHistory } from 'react-router-dom';

const NavigateToScreen = (screen) => {
    // why not do the redirect option then force a update state
    console.log('NavigateToScreen screen props', screen, this.props);
    const history = useHistory();
    history.push(screen);
    return (
        <div>
            <button>
                redirecting...
            </button>
        </div>
    );
}

export default NavigateToScreen;