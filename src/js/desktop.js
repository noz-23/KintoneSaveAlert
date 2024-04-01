/*
 *KintoneSaveAlert
 * Copyright (c) 2024 noz-23
 *  https://github.com/noz-23/
 *
 * Licensed under the MIT License
 * 
 *  利用：
 *   JQuery:
 *     https://jquery.com/
 *     https://js.cybozu.com/jquery/3.7.1/jquery.min.js
 *   
 *   jsrender:
 *     https://www.jsviews.com/
 *     https://js.cybozu.com/jsrender/1.0.13/jsrender.min.js
 * 
 * History
 *  2024/03/31 0.1.0 初版とりあえずバージョン
 */

jQuery.noConflict();

(async ( PLUGIN_ID_) => {
  'use strict';

  // Kintone プラグイン 設定パラメータ
  const config = kintone.plugin.app.getConfig(PLUGIN_ID_);

  const contentCreate =config['paramStrCreate'];
  const contentEdit   =config['paramStrEdit'];
  const contentIndex  =config['paramStrIndex'];

  const EVENTS_CREATE=[
    'app.record.create.submit', // 作成表示
  ];
  const EVENTS_EDIT=[
    'app.record.edit.submit',   // 編集表示
  ];
  const EVENTS_INDEX=[
    'app.record.index.submit',  // 一覧表示
  ];

  kintone.events.on(EVENTS_CREATE, async (events_) => {
    console.log('events_:%o',events_);

    console.log('contentCreate:%o',contentCreate);
    if(contentCreate.length >0){
      alert(contentCreate);
    }

    return events_;
  });

  kintone.events.on(EVENTS_EDIT, async (events_) => {
    console.log('events_:%o',events_);

    console.log('contentEdit:%o',contentEdit);
    if(contentEdit.length >0){
      alert(contentEdit);
    }

    return events_;
  });

  kintone.events.on(EVENTS_INDEX, async (events_) => {
    console.log('events_:%o',events_);

    console.log('contentIndex:%o',contentIndex);
    if(contentIndex.length >0){
      alert(contentIndex);
    }

    return events_;
  });

})(kintone.$PLUGIN_ID);
