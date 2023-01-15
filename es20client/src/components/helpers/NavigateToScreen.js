import React from 'react';
import { useHistory } from 'react-router-dom';

const NavigateToScreen = (screen) => {
    console.log('NavigateToScreen');
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