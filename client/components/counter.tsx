import React, { useState } from 'react';

const Counter: React.FC<{ count: number, setCount: (count: number) => void }> = ({ count, setCount }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setCount(count - 1)} style={{ borderRadius: '0.25em', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1.5em', height: '1.5em' }}>-</button>
            <div style={{
                minWidth: '40px',
                textAlign: 'center',
                border: '1px solid #ccc',
                padding: '4px 12px',
                borderRadius: '4px',
                background: '#f9f9f9'
            }}>
                {count}
            </div>
            <button onClick={() => setCount(count + 1)} style={{ borderRadius: '0.25em', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1.5em', height: '1.5em' }}>+</button>
        </div>
    );
};

export default Counter;