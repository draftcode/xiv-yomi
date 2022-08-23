import { Col, Input, PageHeader, Row, Table, Typography } from 'antd'
import type { NextPage } from 'next'
import { Item, items } from '../data/readings'
import { useState } from 'react';
import { createFuzzyMatcher } from '../utils/fuzzy_matcher';
import Head from 'next/head';

const { Paragraph } = Typography;

const columns = [
    {
        dataIndex: 'name',
        key: 'name',
        render: (_: any, item: Item) => (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://jp.finalfantasyxiv.com/lodestone/playguide/db/item/${item.id}/`}
            >
                {item.name}
            </a>
        ),
    },
    {
        dataIndex: 'yomi',
        key: 'yomi',
        render: (_: any, item: Item) => item.yomi.map(s => <span key={s}>{s}<br /></span>),
    },
];

const Home: NextPage = () => {
    const [searchValue, setSearchValue] = useState('')
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    let shownItems = items;
    if (searchValue != '') {
        const matcher = createFuzzyMatcher(searchValue)
        shownItems = shownItems.filter(item => matcher([item.name].concat(item.yomi)))
    }
    return (
        <>
            <Head>
                <title>FF14 難読アイテム</title>
            </Head>
            <Row>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 3 }}>
                    <PageHeader title="FF14 難読アイテム" />
                    <Paragraph>適当にそれっぽい読みを当てただけ。公式の読みではないです。</Paragraph>
                    <Input.Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onSearchChange} />
                    <Table
                        columns={columns}
                        dataSource={shownItems}
                        rowKey="id"
                        showHeader={false}
                        size="small"
                    />
                    <Paragraph>© SQUARE ENIX CO., LTD. All Rights Reserved.</Paragraph>
                </Col>
            </Row>
        </>
    )
}

export default Home
