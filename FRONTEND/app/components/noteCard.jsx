import React from 'react';
import { dateFormat } from '../utils/dateFormat'

const NoteCard = ({ key, title, content, tags, deadline, folder, lastUpdated }) => {
    return (
        <div className="bg-pastelYellow rounded-[10px] h-30 w-80 p-3 hover:shadow-custom" key={note.id}>
            {key}
            {title}
            {content.slice(0,60)}
            {tags?.length > 0 && (
                <div className="flex flex-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 text-sm text-slate-900 bg-lightGrey px-3 py-1 rounded">
                            # {tag}
                        </span>
                    ))}
                </div>
            )}
            {dateFormat(deadline)}
            {folder}
            {dateFormat(lastUpdated)}
        </div>
    )
}

export default NoteCard;    