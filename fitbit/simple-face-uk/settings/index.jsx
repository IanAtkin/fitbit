console.log("Settings code started");

function basicSettings(props) {
    return (
        <Page>
            <Section>
                <Text>
                    This clock face has one experimental setting.
                </Text>
                <Toggle
                    settingsKey = "trading"
                    label = "Highlight stock market open"
                />
            </Section>
        </Page>
    );
}

registerSettingsPage(basicSettings);