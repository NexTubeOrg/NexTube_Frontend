import React, { useState } from 'react';

export const DialogConfirm = (props: {
    handleAgreeClick: () => Promise<void> | null,
    handleDisagreeClick: () => Promise<void> | null,
    actionText: string,
}) => {

    return (
        <React.Fragment>
            <div className="fixed inset-0 flex items-center justify-center bg-secondary bg-opacity-75 z-50 rounded-md">
                <div className="bg-gray p-8 rounded-md text-center">
                    <h2 className="text-2xl text-white mb-4">{props.actionText}</h2>
                    <div className="flex justify-center">
                        <button
                            className="py-2 px-4 text-white rounded-md mr-2 cursor-pointer"
                            onClick={() => props.handleDisagreeClick()}
                        >
                            Disagree
                        </button>
                        <button
                            className="py-2 px-4 bg-lime text-white rounded-md cursor-pointer"
                            onClick={() => props.handleAgreeClick()}
                        >
                            Agree
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}