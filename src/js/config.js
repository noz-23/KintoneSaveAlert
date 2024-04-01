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
 *
 */

jQuery.noConflict();

(async ( jQuery_,PLUGIN_ID_)=>{
  'use strict';

  // 設定パラメータ
  const ParameterStringCreate ='paramStrCreate';
  const ParameterStringEdit   ='paramStrEdit';
  const ParameterStringIndex  ='paramStrIndex';

  // 環境設定
  const Parameter = {
  // 表示文字
    Lang:{
      en:{
        plugin_titile      : 'Kintone Save Alert Plugin',
        plugin_description : 'Alert is displayed at the top of the screen when saving',
        plugin_label       : 'Please Settin Contentes(empty is no show)',
        create_label       : 'Content When Save Create ',
        edit_label         : 'Content When Save Edit   ',
        index_label        : 'Content When Save Index  ',
        plugin_cancel      : 'Cancel',
        plugin_ok          : ' Save ',
        alert_message      : 'Please don\'t same fields Organizations and Primary'
      },
      ja:{
        plugin_titile      : '保存時の確認表示 プラグイン',
        plugin_description : '保存時に画面上部に確認を表示します',
        plugin_label       : '文言を設定して下さい(空は表示なし)',
        create_label       : '新規作成保存時の文言',
        edit_label         : '　編集保存時の文言　',
        index_label        : '　一覧保存時の文言　',
        plugin_cancel      : 'キャンセル',
        plugin_ok          : '   保存  ',
      },
      DefaultSetting:'ja',
      UseLang:{}
    },
    Html:{
      Form               : '#plugin_setting_form',
      Title              : '#plugin_titile',
      Description        : '#plugin_description',
      Label              : '#plugin_label',
      CreateLabel        : '#create_label',
      EditLabel          : '#edit_label',
      IndexLabel         : '#index_label',
      Cancel             : '#plugin_cancel',
      Ok                 : '#plugin_ok',
    },
    Elements:{
      CreateContent      : '#create_content',
      EditContent        : '#edit_content',
      IndexContent       : '#index_content',      
    },
  };
  
 
  /*
  HTMLタグの削除
   引数　：htmlstr タグ(<>)を含んだ文字列
   戻り値：タグを含まない文字列
  */
  const escapeHtml =(htmlstr)=>{
    return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;').replace(/'/g, '&#39;');
  };  

  /*
  ユーザーの言語設定の読み込み
   引数　：なし
   戻り値：なし
  */
  const settingLang=()=>{
    // 言語設定の取得
    Parameter.Lang.UseLang = kintone.getLoginUser().language;
    switch( Parameter.Lang.UseLang)
    {
      case 'en':
      case 'ja':
        break;
      default:
        Parameter.Lang.UseLang =Parameter.Lang.DefaultSetting;
        break;
    }
    // 言語表示の変更
    var html = jQuery(Parameter.Html.Form).html();
    var tmpl = jQuery.templates(html);
    
    var useLanguage =Parameter.Lang[Parameter.Lang.UseLang];
    // 置き換え
    jQuery(Parameter.Html.Form).html(tmpl.render({lang:useLanguage})).show();
  };

  /*
  フィールド設定
   引数　：なし
   戻り値：なし
  */
  const settingHtml= async ()=>{
    // 現在データの呼び出し
    var nowConfig =kintone.plugin.app.getConfig(PLUGIN_ID_);
    console.log("nowConfig:%o",nowConfig);

    // 現在データの表示
    if(nowConfig[ParameterStringCreate]){
      jQuery(Parameter.Elements.CreateContent).val(nowConfig[ParameterStringCreate]); 
    }
    if(nowConfig[ParameterStringEdit]){
      jQuery(Parameter.Elements.EditContent).val(nowConfig[ParameterStringEdit]); 
    }
    if(nowConfig[ParameterStringIndex]){
      jQuery(Parameter.Elements.IndexContent).val(nowConfig[ParameterStringIndex]); 
    }
  };

  /*
  データの保存
   引数　：なし
   戻り値：なし
  */
   const saveSetting=()=>{
    // 各パラメータの保存
    var config ={};
    config[ParameterStringCreate]=String(jQuery(Parameter.Elements.CreateContent).val()).trim();
    config[ParameterStringEdit]  =String(jQuery(Parameter.Elements.EditContent).val()).trim();
    config[ParameterStringIndex] =String(jQuery(Parameter.Elements.IndexContent).val()).trim();

    console.log('config:%o',config);

    // 設定の保存
    kintone.plugin.app.setConfig(config);
  };

  // 言語設定
  settingLang();
  await settingHtml();

  // 保存
  jQuery(Parameter.Html.Ok).click(() =>{saveSetting();});
  // キャンセル
  jQuery(Parameter.Html.Cancel).click(()=>{history.back();});
})(jQuery, kintone.$PLUGIN_ID);
