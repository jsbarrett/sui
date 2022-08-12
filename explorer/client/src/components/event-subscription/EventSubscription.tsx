// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { type SuiEventFilter } from '@mysten/sui.js';
import React, { useState, useCallback, useContext } from 'react';

import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { NetworkContext } from '../../context';
import { DefaultRpcClient as rpc } from '../../utils/api/DefaultRpcClient';

import styles from './EventSubscription.module.css';

function EventSubscription() {
    const [input, setInput] = useState('');
    const [filterObjId, setFilterObjId] = useState('0x');
    const [selectedFilterType, setSelectedFilterType] = useState('objectId');
    const [network] = useContext(NetworkContext);

    const [pleaseWaitMode, setPleaseWaitMode] = useState(false);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Prevent empty search
            if (!input.length) return;
            setPleaseWaitMode(true);

            // remove empty char from input
            let query = input.trim();
            console.log('query', query);

            try {
                let filter: SuiEventFilter = JSON.parse(query);
                console.log('filter', filter);

                let rpcProvider = rpc(network);
                console.log('rpc provider', rpcProvider);

                rpcProvider.subscribeEvent(filter, (event) => {
                    console.log(event);
                });
            } catch (e) {
                console.error(e);
            }
        },
        [input, network]
    );

    const handleTextChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.currentTarget.value),
        [setInput]
    );

    const handleObjectIdTextChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterObjId(e.currentTarget.value),
        [setFilterObjId]
    );

    const handleFilterSelectChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log('select filter change', e.currentTarget.value);
            setSelectedFilterType(e.currentTarget.value);
        }, [setSelectedFilterType]
    );

    return (
        <div>
            <h3>Event Subscription Tester</h3>
            <form
                className={styles.selectform}
                onSubmit={handleSubmit}
                aria-label="event filter type form"
            >
                <label>
                    Filter Type
                    <select id="eventFilterSelect" onChange={handleFilterSelectChange}>
                        <option value="package">Package</option>
                        <option value="module">Module</option>
                        <option selected value="objectId">
                            ObjectId
                        </option>
                        <option value="senderAddress">Sender Address</option>
                        <option value="eventType">Event Type</option>
                        <option value="moveEventType">Move Event Type</option>
                        <option value="moveEventField">Move Event Field</option>
                        <option value="All">All</option>
                        <option value="Any">Any</option>
                        <option value="And">And</option>
                        <option value="Or">Or</option>
                    </select>
                </label>
            </form>
            <form
                className={styles.selectform}
                onSubmit={handleSubmit}
                aria-label="event filter details form"
            >
                <div>
                {selectedFilterType === 'objectId' && (
                    <label>
                        Object ID
                        <div className={styles.form}>
                        <input
                            className={styles.searchtext}
                            id="searchText"
                            placeholder="Object ID"
                            value={filterObjId}
                            autoFocus
                            onChange={handleObjectIdTextChange}
                            type="text"
                        />
                        </div>
                    </label>
                )}
                </div>
            </form>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
                aria-label="event subscription form"
            >
                <input
                    className={styles.searchtextdesktop}
                    id="searchText"
                    placeholder="Subscribe to an event"
                    value={input}
                    onChange={handleTextChange}
                    autoFocus
                    type="text"
                />
                <input
                    className={styles.searchtextmobile}
                    id="searchText"
                    placeholder="Subscribe event"
                    value={input}
                    onChange={handleTextChange}
                    autoFocus
                    type="text"
                />
                <button
                    id="searchBtn"
                    type="submit"
                    disabled={pleaseWaitMode}
                    className={`${styles.searchbtn} ${
                        pleaseWaitMode && styles.disabled
                    }`}
                >
                    {pleaseWaitMode ? (
                        'Please Wait'
                    ) : (
                        <SearchIcon className={styles.searchicon} />
                    )}
                </button>
            </form>
        </div>
    );
}

export default EventSubscription;
