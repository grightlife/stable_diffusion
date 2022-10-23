import axios, { AxiosRequestConfig } from 'axios';

const api = '/api';

/**
 * @description: useRequest({url: 'XXXXX', data: {}})
 * @param {type}
 * @return { response, error }
 */
export const useRequest = async (axiosConfig: AxiosRequestConfig) => {
  let response;
  let error;
  try {
    response = await axios(axiosConfig);
  } catch (err) {
    console.log(err)
  }
  return { response, error };
};

export const generate = async (data: any) =>
  useRequest({
    method: 'post',
    url: `${api}/generate`,
    data,
  });


export const checkExist = async (id: string) =>
  useRequest({
    method: 'get',
    url: `${api}/checkexist?id=${id}`,
  });

