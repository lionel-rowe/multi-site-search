import React from 'react';
import './App.css';

const sites = [
  //alibaba
  {cat: 'Alibaba', name: 'Alibaba Cloud', zhCN: 'aliyun.com', enUS: 'alibabacloud.com'}
  //other cloud vendors
  , {cat: 'Other Cloud Vendors', name: 'AWS', enUS: 'aws.amazon.com'}
  , {cat: 'Other Cloud Vendors', name: 'Azure', enUS: 'azure.microsoft.com'}
  , {cat: 'Other Cloud Vendors', name: 'Google Cloud', enUS: 'cloud.google.com'}
  //general IT
  , {cat: 'IT', name: 'IBM', enUS: 'ibm.com'}
  , {cat: 'IT', name: 'MSDN', enUS: 'msdn.microsoft.com'}
  //database
  , {cat: 'Database', name: 'Oracle', enUS: 'oracle.com'}
  , {cat: 'Database', name: 'MySQL', enUS: 'mysql.com'}
  , {cat: 'Database', name: 'MongoDB', enUS: 'mongodb.com'}
  , {cat: 'Database', name: 'Redis', enUS: 'redis.io'}
  //web
  , {cat: 'Web', name: 'MDN', enUS: 'https://developer.mozilla.org/en-US/', zhCN: 'https://developer.mozilla.org/zh-CN/'}
  , {cat: 'Web', name: 'W3School[s]?', enUS: 'w3schools.com', zhCN: 'w3school.com.cn'}
  //other
  , {name: 'IETF', enUS: 'ietf.org'}
  , {name: 'Wikipedia', enUS: 'en.wikipedia.org', zhCN: 'zh.wikipedia.org'}
  , {name: 'Techopedia', enUS: 'techopedia.com'}
];

const cats = ['Alibaba', 'Other Cloud Vendors', 'IT', 'Database', 'Web', 'Other'];

const tld = 'com';
const langs = ['enUS', 'zhCN'];
const humanReadableLangs = {enUS: 'English', zhCN: 'Chinese'};

class LinkPage extends React.Component {
  
  state = {
    input: ''
  };

  render() {
    return (
      <div className='container'>
        <header>
          <h1>Multi-Site Search</h1>
          <input 
            type='text'
            onChange={e => {
              e.preventDefault();
              this.setState({input: e.target.value})
            }}
            placeholder='Enter search terms'
          />
        </header>
        <main>
          {cats.map((cat, catKey) => {

            const filteredSites = sites.filter(site => {
              return cat === 'Other'
                ? cats.indexOf(site.cat) === -1 || site.cat === 'Other'
                : site.cat === cat;
            });

            return (
              <div className='cat' key={catKey}>
                <h2>{cat}</h2>
                <ul>
                  {
                    filteredSites.map((site, siteKey) => {
                      return (
                        <li key={siteKey}>
                          <div><strong>{site.name}</strong></div>
                          <div>
                            {langs.map((lang, langKey) => {
                              return site[lang]
                                ? <a key={langKey} href={
                                    this.state.input
                                    ? `https://www.google.${tld}/search?q=${encodeURIComponent(this.state.input + ' site:' + site[lang])}`
                                    : '#'
                                  } target='_blank'>{humanReadableLangs[lang]}</a>
                                : '';
                            })
                            .filter(el => el)
                            .reduce((acc, el, idx, arr) => {
                              return idx < arr.length - 1 ? acc.concat([el, ' | ']) : acc.concat([el]);
                            }, [])}
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            );

          })}
        </main>
      </div>
    );
  }
}

export default LinkPage;
