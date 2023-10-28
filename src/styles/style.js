/* eslint-disable prettier/prettier */
import {StyleSheet,Dimensions} from 'react-native';
import { FontFamily} from '../GlobalStyles';

const styles = StyleSheet.create({
  logoText: {
    color: '#FFD706',
    fontWeight: 'bold',
    fontFamily:FontFamily.anybodyRegular,
    fontSize: 34,
  },
  playNowFlexBox: {
    display: 'flex',
    textAlign: 'center',
    position: 'absolute',
  },
  playNow: {
    width: '65%',
    top: '30%',
    left: '17.83%',
    fontSize: 0.079 * Dimensions.get('window').width,
    fontWeight: '900',
    fontFamily: FontFamily.anybodyExtraBold,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
  },
  framePosition: {
    opacity: 0.5,
    bottom: '0%',
  },
  frameInnerLayout: {
    opacity: 0.7,
    maxHeight: '100%',
    maxWidth: '100%',
    position: 'absolute',
    overflow: 'hidden',
  },
  frameChild1Position: {
    left: '5.78%',
    right: '6.31%',
    width: '87.91%',
    height: '2.27%',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  frameChild: {
    height: '100%',
    backgroundColor: 'transparent',
    shadowOpacity: 1,
    elevation: 7.71,
    shadowRadius: 7.71,
    shadowOffset: {
      width: 0,
      height: 3.8545167446136475,
    },
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    left: '0%',
    bottom: '0%',
    right: '0%',
    position: 'absolute',
    width: '100%',
  },
  frameItem: {
    backgroundColor: '#5030DB',
    top: '40.67%',
    height: '50.33%',
    left: '0%',
    right: '0%',
    opacity: 0.7,
    position: 'absolute',
    width: '100%',
  },
  frameInner: {
    width: '93.57%',
    top: '80.67%',
    height: '49.33%',
    bottom: '0%',
    opacity: 0.5,
    maxHeight: '100%',
    maxWidth: '100%',
  },
  ellipseIcon: {
    height: '22.73%',
    width: '93.11%',
    right: '3.42%',
    //bottom: '30.27%',
    left: '3.47%',
    top: '0%',
  },
  rectangleLineargradient: {
    bottom: '97.73%',
    top: '0%',
  },
  frameChild1: {
    backgroundColor: '#8952F5',
    top: '97.73%',
    opacity: 0.5,
    bottom: '0%',
  },
  rectangleParent: {
    top: 0,
    left: 0,
    width: '100%',
    height: 85,
    borderRadius: 19,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#5030DB',
    elevation: 5,
  },
  button: {
    backgroundColor: '#5030DB',
    height: '30%',
    width: '70%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  home: {
    alignSelf: 'center',
    flex: 1,
    height: '90%',
    overflow: 'hidden',
    width: '100%',
    flexDirection:'column',
  },
  row: {
    flex:0.18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  HorizontalDistance: {
    paddingHorizontal: '35%',
  },
  centeredRow: {
    justifyContent: 'center',
  },
  modalContainer:{
  position:'absolute',
  bottom:0,
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  width:'100%',
  backgroundColor:'#700285',
  //flex: 0.65,
  flexDirection: 'column',
  // borderColor:'white',
  // borderWidth:2,
  height:'60%',
  },
  modalHeader:{
    alignSelf:'center',
    color:'white',
    fontSize:20,
     marginTop:20,
  },
  modalRow:{
    width:'80%',
    alignSelf:'center',
    borderColor:'white',
    borderWidth:1,
    flex: 0.25,
    flexDirection: 'column',
    marginTop:20,
    borderRadius:10,
  },
  duration:{
    color:'white',
    fontSize: 0.049 * Dimensions.get('window').width,
    lineHeight: 40,
    marginLeft:10,
    alignSelf:'center',
  },
  price:{
    alignSelf:'center',
    color:'white',
    fontSize: 0.049 * Dimensions.get('window').width,
    lineHeight: 40,
    marginRight:10,
  },
  modalButton:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  //justifyContent:'flex-start',
  alignItems:'center',
  },
  cancelButton:{
     alignSelf:'center',
     width:'75%',
     justifyContent:'center',
     alignItems:'center',
  },
  cancel:{
    color:'#fff',
    textAlign:'center',
    alignSelf:'center',
    fontSize: 23,
    width:'60%',
    padding: '3%',
    backgroundColor: '#5030DB',
    borderColor: 'gold',
    borderRadius: 30,
    borderWidth: 2,
  },
  cbtn:{
    flex: 0.3,
    marginTop:40,
  },
  lastrow:{
    width:'70%',
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf:'center',
  },
  restore:{
 color:'#fff',

  },
});


export default styles;
