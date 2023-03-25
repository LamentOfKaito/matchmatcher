/**
 * @todo
 */
export function TriAvatar({items}) {
    console.assert(items.length === 3);
    
    return <div className='kai-triavatar'>
        {...items}
    </div>
}
