# react-reduce (*WIP*)

## example usage

```js
export default () => (
    <Transform toTransform={['a', 'b', 'c']} transformers={['filter', 'filter2']}>
        {({ response, refs, onChange }) => (
            <React.Fragment>
                <Filter ref={refs.filter} onChange={onChange}/>
                <Filter2 ref={refs.filter2} onChange={onChange}/>
                <pre>{JSON.stringify(response, null, '\t')}</pre>
            </React.Fragment>
        )}
    </Transform>);

```