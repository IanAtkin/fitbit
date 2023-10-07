console.log("Settings code started");

function noSettings(props) {
    return (
        <Page>
            <Section>
                <Text>
                    This clock face has no settings.
                </Text>
            </Section>
        </Page>
    );
}

registerSettingsPage(noSettings);