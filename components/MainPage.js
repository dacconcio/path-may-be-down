import Dialog, {
  ScaleAnimation,
  DialogContent
} from 'react-native-popup-dialog';
import React from 'react';
import { connect } from 'react-redux';
import { stopDialogs, checkIfPathDown } from '../store.js';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native-material-ui';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { AdMobBanner } from 'expo';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      start: 'Enter a starting location',
      destination: 'Enter a destination'
    };
  }

  bannerError() {
    console.log('Banner Error!');
    return;
  }
  render() {
    return (
      <View style={styles.content}>
        <View>
          {this.props.pathDownDialog || this.props.pathOkDialog ? null : (
            <View>
              <TextInput
                style={{
                  height: 40,
                  width: 320,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  borderWidth: 1
                }}
                onChangeText={start => this.setState({ start })}
                value={this.state.start}
                clearTextOnFocus={true}
              />

              <TextInput
                style={{
                  height: 40,
                  width: 320,
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  borderWidth: 1
                }}
                onChangeText={destination => this.setState({ destination })}
                value={this.state.destination}
                clearTextOnFocus={true}
              />
            </View>
          )}
        </View>

        <Button
          primary
          raised
          onPress={() =>
            this.props.checkIfPathDown(this.state.start, this.state.destination)
          }
          text="Check PATH status"
        />

        <View>
          {this.props.pathDownDialog || this.props.pathOkDialog ? null : (
            <AdMobBanner
              bannerSize="banner"
              adUnitID="ca-app-pub-5504214835843068/1479403405"
              testDeviceID="EMULATOR"
              onDidFailToReceiveAdWithError={this.bannerError}
            />
          )}
        </View>

        <Spinner
          animation="slide"
          visible={this.props.runSpinner}
          size="large"
          overlayColor="rgb(114, 120, 130)"
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color="#2196f3"
        />

        <Dialog
          overlayOpacity={0}
          visible={this.props.pathDownDialog}
          onTouchOutside={this.props.stopDialogs}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0,
              useNativeDriver: true
            })
          }
        >
          <DialogContent style={styles.dialogBox}>
            <Text style={styles.dialogText}>THE PATH IS DOWN!</Text>
          </DialogContent>
        </Dialog>

        <Dialog
          overlayOpacity={0}
          visible={this.props.pathOkDialog}
          onTouchOutside={this.props.stopDialogs}
          dialogAnimation={
            new ScaleAnimation({
              toValue: 0,
              useNativeDriver: true
            })
          }
        >
          <DialogContent style={styles.dialogBox}>
            <Text style={styles.dialogText}>THE PATH IS OK!</Text>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfPathDown: (startingLocation, destination) =>
      dispatch(checkIfPathDown(startingLocation, destination)),
    stopDialogs: () => dispatch(stopDialogs())
  };
};

const mapStateToProps = state => {
  return {
    isPathDown: state.isPathDown,
    runSpinner: state.runSpinner,
    pathDownDialog: state.pathDownDialog,
    pathOkDialog: state.pathOkDialog
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  dialogBox: {
    backgroundColor: '#2196f3',
    justifyContent: 'center'
  },

  buttonContainer: {
    backgroundColor: '#2196F3'
  },

  buttonText: {
    fontSize: 40,
    backgroundColor: '#022cd4'
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  dialogText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'System',
    backgroundColor: '#2196f3',
    color: 'white',
    justifyContent: 'center'
  },

  spinnerTextStyle: {
    color: '#2196f3',
    fontSize: 20,
    fontFamily: 'System'
  },

  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
