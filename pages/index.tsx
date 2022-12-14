import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout, Button, Row, Col, Form, Input, Slider, Tag, Spin } from "antd";
import styles from "../styles/Home.module.css";
import { generate, checkExist } from "../utils/useRequest";
import cx from 'classnames'

const { Header: AntdHeader, Sider, Content } = Layout;
const { TextArea } = Input;
const aspectRatio = (w: number, h: number) => {
  return `${w} / ${h}`;
};
const widthAndHeight = (v: number) => {
  return 64 * v;
};

const Home: NextPage = () => {
  const [processing, setProcessing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | undefined>("/point.png");
  const [value, setValue] = useState({
    width: 1,
    height: 1,
    step: 25,
    prompt: "Robotic Humans Monsters, trending on ArtStation, very detailed",
  });

  const checkLoop = async (id: string) => {
    const { response, error } = await checkExist(id);
    if (response?.data?.isExist === false) {
      setTimeout(() => {
        checkLoop(id);
      }, 5000);
    } else {
      setImageUrl(`/samples/${id}.png`);
      setIsEmpty(false)
      setProcessing(false);
    }
  };
  const onSubmit = async () => {
    setProcessing(true);
    const prompt = value.prompt.trim().replace(/\n/g, "");
    const { response, error } = await generate({
      ...value,
      height: widthAndHeight(value.height),
      width: widthAndHeight(value.width),
      prompt,
    });
    checkLoop(response?.data?.id);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AntdHeader className={styles.header}>
          <Row>
            <Col flex="none">
              <img className={styles.logo} src={`/logo.png`} />
            </Col>
            <Col flex="auto" className={"text-right"}></Col>
          </Row>
        </AntdHeader>
        <Layout>
          <Sider width={300} className={styles.leftMenu}>
            <Form onFinish={onSubmit} layout="vertical">
              <Form.Item
                label={
                  <Row>
                    <Col span={18}>Width</Col>
                    <Col span={6} className={styles.tr}>
                      <Tag color="default">{widthAndHeight(value.width)}</Tag>
                      {/* <Input disabled size={'small'} value={widthAndHeight(value.width)} /> */}
                    </Col>
                  </Row>
                }
                name="width"
              >
                <div className={styles.subTitle}>
                  The width of the generated image.
                </div>
                <Slider
                  min={1}
                  max={16}
                  disabled={processing}
                  tooltip={{ open: false }}
                  value={value.width}
                  onChange={(v) => {
                    setValue({
                      ...value,
                      width: v,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <Row>
                    <Col span={18}>Height</Col>
                    <Col span={6} className={styles.tr}>
                      <Tag color="default">{widthAndHeight(value.height)}</Tag>
                    </Col>
                  </Row>
                }
                name="height"
              >
                <div className={styles.subTitle}>
                  The height of the generated image.
                </div>
                <Slider
                  min={1}
                  max={16}
                  disabled={processing}
                  tooltip={{ open: false }}
                  value={value.height}
                  onChange={(v) => {
                    setValue({
                      ...value,
                      height: v,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <Row>
                    <Col span={18}>Steps</Col>
                    <Col span={6} className={styles.tr}>
                      <Tag color="default">{value.step}</Tag>
                    </Col>
                  </Row>
                }
                name="steps"
              >
                <div className={styles.subTitle}>
                  How many steps to spend generating (diffusing) your image.
                </div>
                <Slider
                  min={25}
                  max={150}
                  disabled={processing}
                  tooltip={{ open: false }}
                  value={value.step}
                  onChange={(v) => {
                    setValue({
                      ...value,
                      step: v,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item label="Prompt" name="prompt">
                <TextArea
                  // value={value}
                  // onChange={e => setValue(e.target.value)}
                  // placeholder="Controlled autosize"
                  disabled={processing}
                  onChange={(e) => {
                    setValue({
                      ...value,
                      prompt: e.target.value,
                    });
                  }}
                  defaultValue="Robotic Humans Monsters, trending on ArtStation, very detailed"
                  autoSize={{ minRows: 9, maxRows: 10 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={processing}
                  disabled={processing}
                  block
                  htmlType={"submit"}
                  size={"large"}
                  type="primary"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Sider>
          <Layout className={styles.container}>
            <Content>
              <div className={styles.mainArea}>
                <div className={styles.imgContainer}>
                  <div
                    className={cx({[styles.imgBg]: true})}
                    style={{
                      width: widthAndHeight(value.width),
                      aspectRatio: aspectRatio(value.width, value.height),
                      height: widthAndHeight(value.height),
                    }}
                  >
                    <Spin spinning={processing}>
                      {<img
                        src={imageUrl}
                        className={cx({[styles.preview]: true, [styles.opacity]: isEmpty})}
                        style={{
                          width: widthAndHeight(value.width),
                          aspectRatio: aspectRatio(value.width, value.height),
                          height: widthAndHeight(value.height),
                        }}
                      />}
                    </Spin>
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </main>
    </div>
  );
};

export default Home;
