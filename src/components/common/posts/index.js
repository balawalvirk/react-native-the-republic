import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Wrapper } from '../../wrappers';

function Posts({ data }) {


    return (
        <Wrapper flex={1}>
            <FlatList
                data={data}
                key={'key'}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <Wrapper>

                        </Wrapper>
                    )
                }}
            />
        </Wrapper>
    );
}

export default Posts;
