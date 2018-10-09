import React from 'react';
import { Transform } from 'react-reduce';

import ModeFilter from './filters/mode-filter.component';
import PriceFilter from './filters/price-filter.component';

export default () => {
    const products = [
        { mode: 'virtual', price: 10, name: 'product 1' },
        { mode: 'virtual', price: 50, name: 'product 2' },
        { mode: 'virtual', price: 500, name: 'product 3' },
        { mode: 'virtual', price: 1000, name: 'product 4' },
        { mode: 'real', price: 20, name: 'product 5' },
        { mode: 'real', price: 80, name: 'product 6' },
        { mode: 'real', price: 200, name: 'product 7' },
        { mode: 'real', price: 400, name: 'product 8' },
    ];

    return (
        <Transform
            toTransform={products}
            transformers={['modeFilter', 'priceFilter']}
        >
            {({ response: filteredProducts, refs, onChange }) => (
                <React.Fragment>
                    <ModeFilter ref={refs.modeFilter} onChange={onChange}/>
                    <PriceFilter ref={refs.priceFilter} onChange={onChange}/>
                    <pre>{JSON.stringify(filteredProducts, null, '\t')}</pre>
                </React.Fragment>
            )}
        </Transform>
    );
};
