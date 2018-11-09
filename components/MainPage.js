import Dialog, {
  ScaleAnimation,
  DialogContent
} from 'react-native-popup-dialog';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { stopDialogs, checkIfPathDown } from '../store.js';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from 'react-native-bootstrap-buttons';
import { StyleSheet, Text, View } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.content}>
        <View>
          {this.props.runSpinner ? null : (
            <Button
              onPress={this.props.checkIfPathDown}
              label="Is the PATH down?"
              buttonType="primary"
              labelStyle={styles.buttonText}
              curved={true}
              rounded={false}
            />
          )}
          <Spinner
            animation="slide"
            size="large"
            visible={this.props.runSpinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>

        <View>
          <Dialog
            visible={this.props.pathDownDialog}
            onTouchOutside={this.props.stopDialogs}
            dialogAnimation={
              new ScaleAnimation({
                toValue: 0, // optional
                useNativeDriver: true // optional
              })
            }
          >
            <DialogContent>
              <Text style={styles.dialogText}>The PATH is down!</Text>
            </DialogContent>
          </Dialog>
        </View>

        <View>
          <Dialog
            visible={this.props.pathOkDialog}
            onTouchOutside={this.props.stopDialogs}
            dialogAnimation={
              new ScaleAnimation({
                toValue: 0, // optional
                useNativeDriver: true // optional
              })
            }
          >
            <DialogContent>
              <Text style={styles.dialogText}>The PATH is OK!</Text>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfPathDown: () => dispatch(checkIfPathDown()),
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
  buttonText: {
    fontSize: 40,
    backgroundColor: '#022cd4'
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  dialogText: {
    fontSize: 60,
    fontWeight: 'bold'
  },

  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 40
  },

  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
